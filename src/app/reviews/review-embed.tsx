"use client";

import { useState } from "react";

export function ReviewEmbed({ url, label }: { url: string; label: string }) {
  const [show, setShow] = useState(false);
  return show ? (
    <iframe title={label + " review widget"} src={url} loading="lazy" width="100%" height={340}
      sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer" style={{ border: 0 }} />
  ) : <button type="button" onClick={() => setShow(true)}>Load {label} widget</button>;
}
