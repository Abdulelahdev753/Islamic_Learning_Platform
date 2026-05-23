import type { MDXComponents } from "mdx/types";
import { Verse } from "@/components/Verse";
import { RuleHighlight } from "@/components/RuleHighlight";
import { Note } from "@/components/Note";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Verse,
    RuleHighlight,
    Note,
    h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-800" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold mt-8 mb-3 text-brand-700" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2 text-brand-700" {...props} />,
    p: (props) => <p className="leading-9 text-lg my-4 text-gray-800" {...props} />,
    ul: (props) => <ul className="list-disc pr-6 space-y-2 my-4 text-lg" {...props} />,
    ol: (props) => <ol className="list-decimal pr-6 space-y-2 my-4 text-lg" {...props} />,
    li: (props) => <li className="leading-8" {...props} />,
    strong: (props) => <strong className="font-bold text-brand-800" {...props} />,
    em: (props) => <em className="not-italic text-brand-600 font-semibold" {...props} />,
    hr: () => <hr className="my-8 border-brand-100" />,
    blockquote: (props) => (
      <blockquote
        className="border-r-4 border-brand-300 bg-brand-50 pr-4 pl-3 py-3 my-4 rounded-l"
        {...props}
      />
    ),
  };
}

export const mdxComponents: MDXComponents = {
  Verse,
  RuleHighlight,
  Note,
};
