"use client"

import { useEffect, useRef, useCallback } from "react"

export function VSLSection() {
  const initialized = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadVidalytics = useCallback(() => {
    const v = window as any
    const i = document
    const d = 'Vidalytics'
    const a = 'vidalytics_embed_lSbVc1xhttQwdQWg'
    const l = 'https://fast.vidalytics.com/embeds/ovDx31Mm/lSbVc1xhttQwdQWg/'
    
    // Ensure the target element exists before proceeding
    const targetElement = document.getElementById(a)
    if (!targetElement) return
    
    // Skip if already initialized for this embed
    if (v[`_vidalytics_initialized_${a}`]) return
    v[`_vidalytics_initialized_${a}`] = true
    
    const y = '_' + d.toLowerCase()
    const c = d + 'L'
    
    if (!v[d]) v[d] = {}
    if (!v[c]) v[c] = {}
    if (!v[y]) v[y] = {}
    
    const vl = 'Loader'
    let vli = v[y][vl]
    let vsl = v[c][vl + 'Script']
    let vlf = v[c][vl + 'Loaded']
    const ve = 'Embed'
    let t: any
    
    if (!vsl) {
      vsl = function(u: string, cb: () => void) {
        if (t) {
          cb()
          return
        }
        const s = i.createElement("script")
        s.type = "text/javascript"
        s.async = true
        s.src = u
        s.onload = function() {
          vlf = 1
          cb()
        }
        i.getElementsByTagName("head")[0].appendChild(s)
      }
    }
    
    vsl(l + 'loader.min.js', function() {
      // Re-check element exists before running
      if (!document.getElementById(a)) return
      
      if (!vli) {
        const vlc = v[c][vl]
        vli = new vlc()
      }
      vli.loadScript(l + 'player.min.js', function() {
        // Final check before running embed
        if (!document.getElementById(a)) return
        
        const vec = v[d][ve]
        t = new vec()
        t.run(a)
      })
    })
  }, [])

  useEffect(() => {
    // Prevent double initialization (React Strict Mode)
    if (initialized.current) return
    initialized.current = true

    // Check if already loaded
    const embedContainer = document.getElementById('vidalytics_embed_lSbVc1xhttQwdQWg')
    if (embedContainer && embedContainer.children.length > 0) return

    // Use requestAnimationFrame to ensure DOM is fully painted
    requestAnimationFrame(() => {
      loadVidalytics()
    })
  }, [loadVidalytics])

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-md md:shadow-lg">
        <div
          id="vidalytics_embed_lSbVc1xhttQwdQWg"
          style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
        />
      </div>
    </div>
  )
}
