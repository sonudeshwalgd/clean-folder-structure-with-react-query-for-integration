import React, { useEffect } from "react";
import SelectHTMLTag2 from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";

export default function Test() {
  const [state, setState] = React.useState<any>();
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <>
      <SelectHTMLTag2
        option={["none", "assa", "jhjkh", "jhghjj"]}
        prop={setState}
      />
    </>
  );
}
