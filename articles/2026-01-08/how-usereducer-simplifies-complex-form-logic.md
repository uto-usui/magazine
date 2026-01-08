---
title: "How useReducer Simplifies Complex Form Logic"
source: "https://www.bitovi.com/blog/how-usereducer-simplifies-complex-form-logic"
publishedDate: "2025-09-18"
category: "frontend"
feedName: "Bitovi"
author: "knazario@bitovi.com (Kyle Nazario)"
---

I recently had the chance to build a moderately complex React form. Instead of scattering the form logic across multiple components, I consolidated it in a single shared store using `useReducer`.

This approach proved helpful for this particular case: the reducer encapsulated all the form logic without requiring a global state manager like Redux.

Here’s the breakdown.

[![Vector](https://no-cache.hubspot.com/cta/default/2171535/interactive-175018652315.png)](https://www.bitovi.com/hs/cta/wi/redirect?encryptedPayload=AVxigLJx8zjiLu54sjUpFxuu9f2vHJZOpRvAYoPvI6dCLW4%2Ft9P9Q7p1i%2Fzf%2FiNnkaKMdMeLcuVy0VpwZ70XOA22EbNxz05oSVjagwwhE4ZBkZr%2F8EhYbcnDOuMeFYJY0awTMIZ1GT6h9F57S0WxpILxJXx9nvnxRueQVezHPrU6J8mgtxXTy1Zk04NnVY6FB7t7yNmIjVawUW%2F4wf1hAQ%3D%3D&webInteractiveContentId=175018652315&portalId=2171535)

## Background

I created a small demo app ([source](https://github.com/kyle-n/ShoppingList), [live demo](https://stackblitz.com/github/kyle-n/ShoppingList)) to illustrate the problem. Imagine you’re building a shopping list web app.

![usereducer-shopping-list](https://www.bitovi.com/hs-fs/hubfs/usereducer-shopping-list.jpeg?width=760&height=507&name=usereducer-shopping-list.jpeg)

The app has five main features:

1.  Users can enter an item name in a text field.
    
2.  Pressing **Enter** or tapping **Add** inserts the item into their shopping list.
    
3.  A **Delete** button lets them remove items when purchased.
    
4.  Each item is editable via a text field.
    
5.  An **Undo** button reverses the last change.
    

The `<App />` component holds the store and passes callbacks to low-logic display components.

```
function App() {
  const [state, dispatch] = useReducer(globalStateReducer, initialGlobalState);
  const addItem = useCallback(
    (newItem: Item) => dispatch({ type: 'addItem', newItem }),
    [dispatch]
  );
  const deleteItem = useCallback(
    (id: string) => dispatch({ type: 'deleteItem', id }),
    [dispatch]
  );
  const updateName = useCallback(
    (id: string, newName: string) =>
      dispatch({ type: 'updateName', id, newName }),
    [dispatch]
  );
  const undo = useCallback(() => dispatch({ type: 'undo' }), []);

  return (
    <>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <ItemInput onSubmit={addItem} />
        <UndoButton onClick={undo} />
        <hr style={{ margin: '2rem 0' }} />
        <ItemList
          items={state.items}
          onDelete={deleteItem}
          onChangeName={updateName}
        />
      </main>
    </>
  );
}
```

### Why `useReducer`?

At first glance, this looks simple enough for `useState`. But the undo button complicates things. To implement undo, we must track **both** the current list and the actions that modified it.

We could try syncing multiple states manually, but this is exactly where a Redux-style pattern shines: consolidating higher-order state management.

Here’s the reducer setup:

```
type GlobalState = {
  items: Item[];
  events: Array<{
    action: Action;
    previousValue?: unknown;
  }>;
};

export const initialGlobalState: GlobalState = {
  items: [],
  events: []
};

export type Action =
  | { type: 'addItem'; newItem: Item }
  | { type: 'deleteItem'; id: string }
  | { type: 'updateName'; id: string; newName: string }
  | { type: 'undo' };
```

The reducer updates `items` and logs actions to an `events` stack. Undoing simply replays the last event in reverse.

```
function undoActionReducer(state: GlobalState): GlobalState {
  const newState = structuredClone(state);
  const lastEvent = newState.events.pop()!;
  const { action } = lastEvent;

  switch (action.type) {
    case 'addItem':
      return {
        ...newState,
        items: newState.items.filter(item => item.id !== action.newItem.id)
      };
    case 'deleteItem': {
      const deletedItem = lastEvent.previousValue as Item;
      return { ...newState, items: [...newState.items, deletedItem] };
    }
    case 'updateName': {
      const previousName = lastEvent.previousValue as string;
      return {
        ...newState,
        items: newState.items.map(item =>
          item.id === action.id ? { ...item, name: previousName } : item
        )
      };
    }
    default:
      return newState;
  }
}
```

This pattern scales neatly. Need to enforce duplicate checks or filter forbidden names? The reducer becomes a central, testable hub for all business rules.

### Key Takeaways

-   `useReducer` allows encapsulating complex form logic in a single location.
    
-   Undo functionality benefits from a reducer-driven event stack.
    
-   The UI stays clean while the state logic grows more robust.
    

### Need Expert Help with React?

If you’re tackling complex React forms or building large-scale applications, Bitovi’s React consulting services can help. Our experts have guided Fortune 100 companies and startups alike through advanced state management, performance tuning, and scalable architecture.

Talk to our [**React consultants**](https://www.bitovi.com/services/frontend/react-consulting) today and accelerate your project with proven expertise.

* * *