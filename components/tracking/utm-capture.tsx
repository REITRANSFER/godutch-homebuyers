"use client"

import { useEffect } from "react"
import { captureAttribution } from "@/lib/utm-capture"

export function UtmCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
