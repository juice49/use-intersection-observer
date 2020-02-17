import { useRef, useState, useCallback, useMemo } from 'react'

type EntryId = string | number

interface UseIntersectionObserverApi {
  addRef: (component, id: EntryId) => void,
  intersecting: Set<EntryId>
}

/**
 * useIntersectionObserver
 * 
 * A React hook that uses IntersectionObserver to check whether a
 * collection of elements are in view. 
 */
export default function useIntersectionObserver (
  options?: IntersectionObserverInit
): UseIntersectionObserverApi {
  if (typeof window === 'undefined') {
    return {
      addRef: () => {},
      intersecting: new Set()
    }
  }

  const [intersecting, setIntersecting] = useState<Set<EntryId>>(new Set())
  const refs = useRef(new WeakMap<Element, EntryId>())

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    setIntersecting((intersecting: Set<EntryId>): Set<EntryId> => {
      const next = new Set(intersecting)

      entries.forEach(entry => {
        const id = refs.current.get(entry.target)

        const method = entry.isIntersecting
          ? 'add'
          : 'delete'

        next[method](id)
      })

      return next
    })
  }, [])

  const observer = useMemo((): IntersectionObserver => {
    return new IntersectionObserver(callback, options)
  }, [callback, options])

  const addRef = (element: Element, id: EntryId): void => {
    if (element && !refs.current.has(element)) {
      refs.current.set(element, id)
      observer.observe(element)
    }
  }

  return {
    addRef,
    intersecting
  }
}
