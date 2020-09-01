import React from "react";

const Setting = props => {
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const tags = params.get("section");

  return (
    <div>
      {tags ? `Setting page - Section: ${tags}` : `Setting page`}
      {/* Setting page - Section: FooSection */}
      {/* Setting page */}
    </div>
  );
};

export default Setting;
