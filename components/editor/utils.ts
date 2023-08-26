import { EditorView } from "@tiptap/pm/view";
import { BlobResult } from "@vercel/blob";
import { toast } from "sonner";

export const handleImageUpload = (file: File, view: EditorView, event: ClipboardEvent | DragEvent | Event) => {
  if (!file.type.includes("image/") || file.size / 1024 / 1024 > 50) {
    toast.error("File not supported or too big.");
    return;
  }

  const insertImage = (url: string) => {
    const node = view.state.schema.nodes.image.create({ src: url, alt: file.name, title: file.name });
    let transaction;
    if (event instanceof DragEvent) {
      const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
      transaction = view.state.tr.insert(coordinates?.pos || 0, node);
    } else {
      transaction = view.state.tr.replaceSelectionWith(node);
    }
    view.dispatch(transaction);
  };

  fetch("/api/upload", {
    method: "POST",
    headers: { "content-type": file.type || "application/octet-stream" },
    body: file,
  })
  .then(async (res) => {
    if (res.status === 200) {
      const { url } = (await res.json()) as BlobResult;
      let image = new Image();
      image.src = url;
      image.onload = () => insertImage(url);
    } else if (res.status === 401) {
      insertImage(URL.createObjectURL(file));
    } else {
      toast.error("Upload failed.");
    }
  });
};
