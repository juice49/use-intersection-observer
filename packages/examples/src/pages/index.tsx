import React, { useState, useEffect } from 'react'
import humanId from 'human-id'
import useIntersectionObserver from 'use-intersection-observer/dist/index.js'

const Page = () => {
  const [ids, setIds] = useState(new Set<string>())
  const { addRef, intersecting } = useIntersectionObserver()

  const add = (count: number = 1) => setIds(ids => {
    const next = new Set(ids)
    
    for (let i = 0; i < count; i ++) {
      next.add(humanId())
    }

    return next
  })

  const remove = (id: string) => setIds(ids => {
    const next = new Set(ids)
    next.delete(id)
    return next
  })

  useEffect(() => {
    add(20)
  }, [])

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '50vh'
        }}
      >
        {[...ids].sort().map(id => (
          <div
            key={id}
            ref={component => addRef(component, id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid pink'
            }}
          >
            <div>
              {id}
              <button
                onClick={() => remove(id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '30rem',
          height: '20rem',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <pre>{JSON.stringify([...intersecting].sort(), null, 2)}</pre>
        <button onClick={() => add()}>Add element</button>
      </div>
    </div>
  )
}

export default Page
