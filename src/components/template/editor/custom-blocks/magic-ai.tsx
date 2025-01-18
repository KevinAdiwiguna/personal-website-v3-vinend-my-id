import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const MagicAi = createReactBlockSpec(
  {
    type: "magic-ai",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <div>

        </div>
      );
    },
  }
);


