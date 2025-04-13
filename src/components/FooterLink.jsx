
import React from "react"
import {Link} from "react-router-dom";

export function FooterLink({ href, children }) {
  return (
      <Link to={href} className="text-blue-400 hover:text-blue-300 mr-4">{children}</Link>
  )
}
