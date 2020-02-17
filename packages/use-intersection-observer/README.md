# useIntersectionObserver

```
npm i @ash/use-intersection-observer
```

Most Intersection Observer helpers are geared towards tracking a single element.
This hook is designed for observing multiple elements.

## Usage

The `useIntersectionObserver` hook returns an object with the following entries:

### addRef: (component, id: EntryId) => void

Call `addRef` from a component `ref` to begin tracking the underlying HTML element.

`EntryId` is a string or number used to uniquely identify the HTML element.

### intersecting: Set<EntryId>

A `Set` containing all of the `EntryId`s that are currently intersecting.

## Example

```js
import useIntersectionObserver from 'use-intersection-observer'

const App = () => {
  const { addRef, intersecting } = useIntersectionObserver()
  const users = ['Louise', 'Bob', 'Linda']

  return (
    <ul>
      {users.map(name => (
        <li
          key={name}
          ref={component => addRef(component, name)}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}
```
