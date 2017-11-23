Issue: when the props to a RA HOC change (in a way that doesn't affect the variables), typically it fetches the query from cache without entering any loading state.

However, if it happens to have a polling query in-flight, it actually enters loading until the query returns.

See App.js: The superfluous `prop` changes after 6s, which happens to be when the first polled query is still in flight (it takes 2s).

So you see in the logs:

```
14:24:55.588 App.js:8 {loading: true}   # at 0 initial load
14:24:57.683 App.js:8 {loading: false}  # at 2s, first query returns
14:25:01.611 App.js:8 {loading: true}   # at 6s, prop changes, second query is in flight (no loading state changed when it started)
14:25:02.610 App.js:8 {loading: false}  # at 7s, second query returns
```
