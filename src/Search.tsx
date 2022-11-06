import lunr from "lunr";
import _keyBy from "lodash/keyBy";
import React, { useMemo, useState } from "react";
import { useLunr } from "./useLunr";

interface SearchProps {
  idx: lunr.Index;
  users: any
}

export const Search: React.FC<SearchProps> = ({
    idx,
    users
}) => {
  const [query, setQuery] = useState<any>("0");
  const [projectId, setProjectId] = useState<any>("0");

  const handleSearch = (e: any) => {
    if (e.target.value.length > 2) {
        console.log('Setting target query ' + e.target.value);
      setQuery(e.target.value);
    }
  };

  // query lunr
  const results = useLunr(
    `+${projectId} +*${query}*`,
    idx,
    _keyBy(users, "userId")
  );


  return (
    <div className="App">
      <h1>A rose</h1>
      <input
        style={{
          width: "100%",
          height: "30px",
        }}
        onChange={handleSearch}
      />
      ProjectId:{" "}
      <input
        onChange={(e) => {
          setProjectId(e.target?.value || "0");
        }}
        style={{
          marginTop: 20,
        }}
      />
      <div
        style={{
          marginTop: 20,
          overflow: "auto",
          minHeight: "300px",
          maxHeight: "300px",
        }}
      >
        <ul>
          {results?.length ? (
            results.map((r: any) => (
              <li key={r.userId}>
                {r.firstName} {r.lastName}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </ul>
      </div>
    </div>
  );
};
