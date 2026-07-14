"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Redo,
  Undo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Upload,
  X,
  Loader2,
  Table as TableIcon,
  Trash2,
  RowsIcon,
  Columns3,
  Baseline,
  Type,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  SquareCode,
  Eraser,
  ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your blog content...",
  label,
}: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"url" | "upload">("upload");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const tableMenuRef = useRef<HTMLDivElement>(null);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextStyle,
      Color,
      FontFamily,
      Subscript,
      Superscript,
      TaskList.configure({
        HTMLAttributes: {
          class: "task-list",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "task-item",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
      if (
        tableMenuRef.current &&
        !tableMenuRef.current.contains(event.target as Node)
      ) {
        setShowTableMenu(false);
      }
      if (
        fontMenuRef.current &&
        !fontMenuRef.current.contains(event.target as Node)
      ) {
        setShowFontMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const openImageModal = useCallback(() => {
    setImageUrl("");
    setImagePreview(null);
    setIsUploading(false);
    setActiveTab("upload");
    setShowImageModal(true);
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE_URL}/blogs/upload-image`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success && result.data?.url) {
        setImageUrl(result.data.url);
      } else {
        alert("Image upload failed. Please try again.");
        setImagePreview(null);
      }
    } catch {
      alert("Image upload failed. Please try again.");
      setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const insertImage = useCallback(() => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setShowImageModal(false);
    setImageUrl("");
    setImagePreview(null);
  }, [editor, imageUrl]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
    setShowTableMenu(false);
  }, [editor]);

  const TEXT_COLORS = [
    { label: "Default", value: "" },
    { label: "Gray", value: "#6b7280" },
    { label: "Red", value: "#ef4444" },
    { label: "Orange", value: "#f97316" },
    { label: "Amber", value: "#f59e0b" },
    { label: "Green", value: "#22c55e" },
    { label: "Teal", value: "#14b8a6" },
    { label: "Blue", value: "#1677ff" },
    { label: "Indigo", value: "#6366f1" },
    { label: "Purple", value: "#a855f7" },
    { label: "Pink", value: "#ec4899" },
  ];

  const FONT_FAMILIES = [
    { label: "Default", value: "" },
    { label: "Sans Serif", value: "ui-sans-serif, system-ui, sans-serif" },
    { label: "Serif", value: "ui-serif, Georgia, serif" },
    { label: "Monospace", value: "ui-monospace, SFMono-Regular, monospace" },
  ];

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-all duration-150 hover:bg-gray-200 ${
        isActive
          ? "bg-blue-100 text-blue-700 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-gray-200 mx-0.5" />;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-gray-50/80 px-2 py-1.5 flex flex-wrap items-center gap-0.5">
          {/* Undo / Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={16} />
          </ToolbarButton>

          <Divider />

          {/* Headings */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </ToolbarButton>

          <Divider />

          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            title="Inline Code"
          >
            <Code size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <SquareCode size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive("subscript")}
            title="Subscript"
          >
            <SubscriptIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive("superscript")}
            title="Superscript"
          >
            <SuperscriptIcon size={16} />
          </ToolbarButton>

          {/* Text Color */}
          <div className="relative" ref={colorPickerRef}>
            <ToolbarButton
              onClick={() => setShowColorPicker((v) => !v)}
              isActive={showColorPicker}
              title="Text Color"
            >
              <Baseline size={16} />
            </ToolbarButton>
            {showColorPicker && (
              <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1.5 w-[180px]">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    title={c.label}
                    onClick={() => {
                      if (c.value) {
                        editor.chain().focus().setColor(c.value).run();
                      } else {
                        editor.chain().focus().unsetColor().run();
                      }
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: c.value || "#ffffff" }}
                  >
                    {!c.value && <X size={12} className="text-gray-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Font Family */}
          <div className="relative" ref={fontMenuRef}>
            <ToolbarButton
              onClick={() => setShowFontMenu((v) => !v)}
              isActive={showFontMenu}
              title="Font Family"
            >
              <Type size={16} />
            </ToolbarButton>
            {showFontMenu && (
              <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 w-[160px]">
                {FONT_FAMILIES.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => {
                      if (f.value) {
                        editor.chain().focus().setFontFamily(f.value).run();
                      } else {
                        editor.chain().focus().unsetFontFamily().run();
                      }
                      setShowFontMenu(false);
                    }}
                    style={{ fontFamily: f.value || undefined }}
                    className="w-full text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
            title="Clear Formatting"
          >
            <Eraser size={16} />
          </ToolbarButton>

          <Divider />

          {/* Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify size={16} />
          </ToolbarButton>

          <Divider />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive("taskList")}
            title="Task List"
          >
            <ListChecks size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote size={16} />
          </ToolbarButton>

          <Divider />

          {/* Insert */}
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive("link")}
            title="Link"
          >
            <LinkIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={openImageModal} title="Insert Image">
            <ImageIcon size={16} />
          </ToolbarButton>

          {/* Table */}
          <div className="relative" ref={tableMenuRef}>
            <button
              type="button"
              onClick={() => setShowTableMenu((v) => !v)}
              title="Table"
              className={`flex items-center gap-0.5 p-1.5 rounded-md transition-all duration-150 hover:bg-gray-200 ${
                editor.isActive("table") || showTableMenu
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TableIcon size={16} />
              <ChevronDown size={12} />
            </button>
            {showTableMenu && (
              <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 w-[200px] space-y-0.5">
                {!editor.isActive("table") ? (
                  <button
                    type="button"
                    onClick={insertTable}
                    className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    <TableIcon size={14} />
                    Insert table
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().addRowAfter().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <RowsIcon size={14} />
                      Add row below
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().addColumnAfter().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <Columns3 size={14} />
                      Add column right
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteRow().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <RowsIcon size={14} />
                      Delete row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteColumn().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <Columns3 size={14} />
                      Delete column
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().mergeOrSplit().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <TableIcon size={14} />
                      Merge / split cell
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteTable().run();
                        setShowTableMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 text-sm rounded-md hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete table
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={16} />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>

      {/* Image Insert Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Insert Image
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === "upload"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Upload size={14} className="inline mr-1.5 -mt-0.5" />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === "url"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LinkIcon size={14} className="inline mr-1.5 -mt-0.5" />
                Paste URL
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {activeTab === "upload" ? (
                <div>
                  <input
                    key={imagePreview ? "has-file" : "no-file"}
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative">
                      <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full max-h-[200px] object-contain"
                        />
                      </div>
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                          <div className="flex items-center gap-2 text-blue-600">
                            <Loader2 size={20} className="animate-spin" />
                            <span className="text-sm font-medium">
                              Uploading...
                            </span>
                          </div>
                        </div>
                      )}
                      {!isUploading && (
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setImageUrl("");
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-md"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                          <Upload size={24} className="text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG, WebP or GIF
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value || null);
                    }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                  {imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full max-h-[200px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertImage}
                disabled={!imageUrl || isUploading}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1677ff] rounded-lg hover:bg-[#0f62d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .tiptap {
          min-height: 300px;
        }
        .tiptap h1 {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .tiptap h2 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.35;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .tiptap h3 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .tiptap p {
          margin-bottom: 0.75rem;
        }
        .tiptap ul,
        .tiptap ol {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .tiptap ul {
          list-style-type: disc;
        }
        .tiptap ol {
          list-style-type: decimal;
        }
        .tiptap blockquote {
          border-left: 3px solid #1677ff;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #555;
          font-style: italic;
        }
        .tiptap code {
          background: #f3f4f6;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.875rem;
        }
        .tiptap a {
          color: #1677ff;
          text-decoration: underline;
          cursor: pointer;
        }
        .tiptap mark {
          background-color: #fef08a;
          padding: 1px 3px;
          border-radius: 2px;
        }
        .tiptap hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .tiptap pre {
          background: #1a202c;
          color: #edf2f7;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-size: 0.875rem;
        }
        .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }
        .tiptap sub,
        .tiptap sup {
          font-size: 0.75em;
        }
        .tiptap ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0.25rem;
        }
        .tiptap ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .tiptap ul[data-type="taskList"] li > label {
          margin-top: 0.2rem;
          user-select: none;
        }
        .tiptap ul[data-type="taskList"] li > div {
          flex: 1;
        }
        .tiptap ul[data-type="taskList"] input[type="checkbox"] {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
        .tiptap table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }
        .tiptap table td,
        .tiptap table th {
          border: 1px solid #e5e7eb;
          padding: 0.5rem 0.75rem;
          vertical-align: top;
          position: relative;
        }
        .tiptap table th {
          background-color: #f9fafb;
          font-weight: 600;
          text-align: left;
        }
        .tiptap table .selectedCell {
          background-color: rgba(22, 119, 255, 0.08);
        }
        .tiptap table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #1677ff;
          pointer-events: none;
        }
        .tiptap .tableWrapper {
          overflow-x: auto;
        }
        .tiptap.resize-cursor {
          cursor: col-resize;
        }
      `}</style>
    </div>
  );
}
