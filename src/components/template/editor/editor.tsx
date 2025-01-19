import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";

import { FaBrain } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";
import { Alert } from "@/components/template/editor/custom-blocks/alert";
import { MagicAi } from "./custom-blocks/magic-ai";



interface EditorProps {
  setContent: any,
  initialContent?: string;
  editable?: boolean;
}


const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    "magic-ai": MagicAi,
  },
});

const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "alert",
  subtext: "Used to emphasize important information",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "alert",
    });
  },
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",
  icon: <RiAlertFill />,
});

const insertMagicAi = (editor: typeof schema.BlockNoteEditor) => ({
  title: "magic ai",
  subtext: "Used to emphasize important information",
  onItemClick: async () => {
    const prevText = editor._tiptapEditor.state.doc.textBetween(
      Math.max(0, editor._tiptapEditor.state.selection.from - 5000),
      editor._tiptapEditor.state.selection.from - 1,
      '\n'
    );

    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt: prevText }),
    });

    const data = await response.json()
    editor._tiptapEditor.commands.insertContent(data);

    insertOrUpdateBlock(editor, {
      type: "magic-ai",
    });
  },
  aliases: [
    "magic ai",
    "ai",
    "magic",
    "ai magic",
  ],
  group: "Other",
  icon: <FaBrain />,
});

export default function Editor({ setContent, editable }: EditorProps) {
  const editor = useCreateBlockNote({
    schema,

    domAttributes: {
      editor: {
        class: "min-h-screen",
      }
    },
    initialContent: [
      {
        type: "paragraph",
      },
    ],
    animations: false,
    defaultStyles: false,
  });

  const defaultShashMenuItems = getDefaultReactSlashMenuItems(editor);

  const filteredItems = defaultShashMenuItems?.filter((item) => [
    "Heading 1"
    , "Heading 2"
    , "Heading 3"
    , "Numbered List"
    , "Bullet List"
    , "Check List"
    , "Paragraph"
    , "Code Block"
    , "Table"
    , "Image"
    , "Emoji"
  ].includes(item.title));

  return (
    <BlockNoteView
      theme={"dark"}
      editor={editor} slashMenu={false} onChange={async () => setContent(await editor.blocksToHTMLLossy(editor.document))} editable={editable}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(
            [...filteredItems, insertAlert(editor), insertMagicAi(editor)],
            query
          )
        }
      />
    </BlockNoteView>
  );
}
