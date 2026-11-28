/** Negotiate only an explicit Markdown preference; wildcards retain normal HTML. */
export function prefersMarkdown(accept: string) {
  const items = accept.toLowerCase().split(",").map((part,index) => {
    const [type,...parameters] = part.trim().split(";");
    const parameter = parameters.map(value=>value.trim()).find(value=>value.startsWith("q="));
    const quality = parameter ? Number(parameter.slice(2)) : 1;
    return { type, index, quality: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0 };
  });
  const markdown = items.filter(item=>item.type === "text/markdown" && item.quality > 0).sort((a,b)=>b.quality-a.quality)[0];
  const explicitHtml = items.filter(item=>item.type === "text/html").sort((a,b)=>b.quality-a.quality)[0];
  const html = explicitHtml ?? items.filter(item=>item.type === "text/*" || item.type === "*/*").sort((a,b)=>b.quality-a.quality)[0];
  return Boolean(markdown && (!html || markdown.quality > html.quality || markdown.quality === html.quality && (html.type !== "text/html" || markdown.index < html.index)));
}
