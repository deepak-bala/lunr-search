import { faker } from '@faker-js/faker';
import lunr from "lunr";
import { useQuery } from "react-query";
import { Search } from "./Search";
import "./App.css";
import {useEffect} from "react";

class User {
  userId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  userType: string | undefined;
  projectId: string | undefined;
}

function App() {
  const { data: users = {}, isLoading } = useQuery(
    ["users"],
    () => {
      let res = [];
      for (let counter = 0; counter < 1000; counter++)
      {
        const randomName = faker.name.fullName(); // Rowan Nikolaus
        const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

        var user = new User();
        user.userId = faker.random.numeric(5);
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.userType = faker.random.numeric(2);
        user.projectId = faker.random.numeric(3);

        res.push(JSON.stringify(user));
      }
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log({isLoading, users});
  },[isLoading, users])

  let last_user_name = '';
  let last_proj_id = '';

  // create lunr index
  const idx = lunr(function () {
    this.ref("userId");
    this.field("firstName");
    this.field("lastName");
    this.field("userType");
    this.field("projectId");



    for (let counter = 0; counter < 10000; counter++) {
      var user = new User();
      user.userId = faker.random.numeric(5);
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.userType = faker.random.numeric(2);
      user.projectId = faker.random.numeric(3);
      this.add(user);
      // @ts-ignore
      users[user.userId] = user;
      console.log('Adding user ' + JSON.stringify(user));
      last_user_name = user.firstName;
      last_proj_id = user.projectId;
    }

  });

  console.time('Execution Time');
  let search_res = idx.search('+' + last_proj_id + ' +' + last_user_name);
  console.timeEnd('Execution Time');
  search_res.forEach((candidate: any) => {
    console.log("Found candidate " + candidate.ref);
  });
  return <Search users={users} idx={idx} />;
}

export default App;
