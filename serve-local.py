"""
Local static server with Netlify-style clean URLs.
/book  -> book.html
/about -> about.html
etc.
"""

from __future__ import annotations

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class CleanURLHandler(SimpleHTTPRequestHandler):
    def do_GET(self):  # noqa: N802
        path = self.path.split("?", 1)[0].split("#", 1)[0]

        if path != "/" and not os.path.splitext(path)[1]:
            relative = path.lstrip("/")
            html_candidate = relative + ".html"
            if os.path.isfile(html_candidate):
                query = ""
                if "?" in self.path:
                    query = "?" + self.path.split("?", 1)[1]
                self.path = "/" + html_candidate + query

        return SimpleHTTPRequestHandler.do_GET(self)


def main() -> None:
    port = int(os.environ.get("PORT", "5500"))
    server = ThreadingHTTPServer(("127.0.0.1", port), CleanURLHandler)
    print(f"Serving Tranquil Escape at http://127.0.0.1:{port}/")
    print("Clean URLs enabled (e.g. /book -> book.html). Ctrl+C to stop.")
    server.serve_forever()


if __name__ == "__main__":
    main()
