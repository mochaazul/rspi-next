# Next JS Skeleton Docs

## Feature
-   Styling: Styled Components, Tailwind 
-   Routing: NextJs App router
# React JS Skeleton Docs

> Documentation IS INCOMPLETE

## Table of Contents
- [Next JS Skeleton Docs](#next-js-skeleton-docs)
	- [Feature](#feature)
- [React JS Skeleton Docs](#react-js-skeleton-docs)
	- [Table of Contents](#table-of-contents)
	- [Project Structure](#project-structure)
	- [Installed Library](#installed-library)
	- [Styling 3rd Party Component](#styling-3rd-party-component)
	- [Styling UI Library Component](#styling-ui-library-component)
	- [Utilities Functions](#utilities-functions)
	- [Helper Functions](#helper-functions)
	- [Hooks](#hooks)


## Project Structure
```
├── docs               # Docs
├── public             # Test files (alternatively `spec` or `tests`)
│    ├── benchmarks    # Load and stress tests
│    ├── integration   # End-to-end, integration tests (alternatively `e2e`)
│    └── unit          # Unit tests
├── src 
│    ├── assets        # Assets files (image/vector/etc..)
│    ├── components    # globally shared components
│    ├── constant      # constant values ex: language config, colors, endpoints
│    ├── helpers       # Helper functions ex: localStorage Handler,query string generator
│    ├── hooks         # Custom hooks
│    ├── interface     # Custom interfaces
│    ├── pages         # Pages Components
│    ├── routes        # Routes Components including auth components
│    ├── stores        # Redux Logic
│    ├── utils         # Utility Functions ex: apiCalls Handler
├── .eslintrc.js       # Eslint configuration, Contact Author For modifying
├── tsconfig.json      # TS configuration Contact Author For modifying

```

> Do not forget to install ESLint Extension if Using VSCode : [Extension Page](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


## Installed Library
-   Styling: Styled Components 
-   State Management: Local state and Redux Toolkit
-   Routing: React Router Dom - V6

## Styling 3rd Party Component

Please use Styled component way to style 3rd party component instead using plain CSS or In-line style
[Styling any component](https://styled-components.com/docs/basics#styling-any-component)

```jsx
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```

## Styling UI Library Component
- ### Ant Design Component
```javascript
   import { Tag } from 'antd';
   import Styled from 'styled-components';

  type Props = { 
    height?    : string;
    minWidth?  : string;
    cursor?    : string;
  }

  export const StyledTag = Styled(Tag)<Props>`
    # Style Properties without any css selector 
    # Will be applied directly on to the Component
    # This will rendered equivalent to
    # <Tag style={{}} />
    height           : ${props => props.height ? props.height : '32px'};
    border-radius    : 16px;
    display          : flex;
    align-items      : center;
    min-width        : ${ props => props.minWidth ? props.minWidth :  '150px'};
    padding-left     : 7px;
    
    ${props => props.cursor && `cursor:${props.cursor};`}

    # Style with a selector will be applied on to 
    # Component children
    # in this case will be
    # <Tag> <p> </p> </Tag> 
    # the p tag will be styled with margin-left: 5px;
    p {
      margin-left: 5px;
    }

    .tagging-icon {
      margin-right: 5px;
    }
  `;

```
- ### Material UI Component
```jsx
// component/Button/style.ts
import Button from '@mui/material/Button';
import Styled from 'styled-components';

export const StyledButton = Styled(Button)`
    background-color: #2b2b2b;
    
    :hover{
      background-color: #3b3b3b;
    }
`
```
## Utilities Functions
- ### ApiCall Function
    > :bulb: Please use this utilites function to make **ANY** Network request call
   
    | Argument | Type       | Nullable? | Description       |
    | -------- | ---------- | --------- | ----------------- |
    | token    | `string`   | Yes       |  JWT Access Token |
    | baseUrl  | `string`   | Yes       |  Base Url string if not provided it will take base url from `src/config.ts` |
    | endpoint | `string`   | No        |  Endpoint path, example `/products` |
    | header   | `object`   | Yes       |  Request header , example `{ "accessToken" : "Bearer accessTokenString" }` |
    | method   |  `GET` `POST` `DELETE` `PUT` `PATCH`   | No  | Request HTML Method |
    | payload  | `object`   | Yes       |  Request HTML Payload  |


- ### thunk Function
    > A wrapper function that accepts a Redux action type string and a callback function that should return a promise
   
    | Argument | Type       | Nullable? | Description       |
    | -------- | ---------- | --------- | ----------------- |
    | type    | `string`   | No       |  A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request |
    | method  | `GET` `POST` `DELETE` `PUT` `PATCH`   | No       |  Request method |
    | queryParam | `object`   | Yes        |  the part of the URL that assigns a value to a specific parameter. |
    | pagination   | `object`   | Yes       |  request pagination |
    | onSuccess   |  `Function`   | Yes  | callback function when success |
    | onFailed  | `Function`   | Yes       |  callback function when failed  |
    | endpoint  | `string`   | No       |  Endpoint path, example `/products`  |



## Helper Functions
- ### History function
    History function used to navigate between routes
    ```javascript
    // src/helpers/history.ts
    const History: CustomHistory = {
      navigate: null,
      push: (page:any, options?:NavigateOptions)  => {
        if (History.navigate) {
          History.navigate(page, options);
        }
      },
    };
    ```
    #### Usage
   ```javascript
    import History from 'helpers/history'
    
    History.push("/dashboard") <- this will push "/dasboard" to history API
   ```    
    > History object will be accessible within the app, even when used outside react life-cycle like in redux actions
## Hooks

  - ### useAppDispatch
    A hook to access the redux dispatch function.
  
    #### Usage

    ```jsx
    import React, { useCallback } from 'react'
    import { useAppDispatch } from 'hooks'

    export const Dashboard = ({ value }) => {
      const getArticles = useAppDispatch(getArticlesAction)
      const handleGetArticle = useCallback(() => {
        getArticles()
      },[getArticles])
      return (
        <div>
          <span>{value}</span>
          <button onClick={handleGetArticle}>Get Articles</button>
        </div>
      )
    }
    ```

  - ### useAppAsyncDispatch
    A hook to access the redux dispatch function which returns promise value
  
    #### Usage

    ```jsx
    import React, { useCallback } from 'react'
    import { useAppDispatch } from 'hooks'

    export const Dashboard = ({ value }) => {
      const getArticles = useAppAsyncDispatch(getArticlesAction)
       const handleGetArticle = useCallback( async () => {
        try {
          const response = await getArticles()
          // do something
        } catch(e) {
          // ....
        }
      },[getArticles])
      return (
        <div>
          <span>{value}</span>
          <button onClick={handleGetArticle}>Get Articles</button>
        </div>
      )
    }
    ```

  - ### useTypedSelector
    A hook to access the redux store's. This hook takes a selector function as an argument. The selector is called with the store state.
  
    #### Usage

    ```jsx
      import React from 'react'
      import { useTypedSelector } from 'hooks'
    
      export const Dashboard = () => {
          const { articles, loading: loadingArticle } = useTypedSelector('articles');
          return (
              <ul>
                {articles.map}
              </ul>
          )
      }
    ```
  - ### usePrevious
    A hook to access previous value of props or state
  

      | Argument | Type       | Nullable? | Description |
      | -------- | ---------- | --------- | ------- |
      | value    | `string`   | No       |  The state that needs to be tracked |
  
    #### Usage
  
    ```jsx
      import React from 'react'
      import { usePrevious } from 'hooks'
  
      export const Counter = () => {
         const [count, setCount] = useState(0);
          const prevCount = usePrevious(count);
  
          const handleClick = () => {
            setCount(count => count + 1);
          };

          return (
            <div>Current count: {count}, Previous count: {prevCount}
              <button onClick={handleClick}>Increment</button>
           </div>
          )
      }
    ```
  - ### useCountDown
     A custom hook that is used to create a countdown timer. 
   
    | Argument | Type       | Nullable? | Description |
    | -------- | ---------- | --------- | ------- |
    | countdownDate    | `number`   | No       |  The date in milliseconds that you want to countdown |
    
    #### Usage
    
    ```jsx
    import React from 'react'
    import { useCountDown } from 'hooks'
    
    export const Counter = () => {
      const { hasStopped, valueCountDown, stopCountdown } = useCountdownTimer(100000);
      
      if(hasStopped) {
          return (
            <div>Countdown has stopped</div>
          )
      }

      return (
        <div> Time: { valueCountDown.minutes} : {valueCountDown.seconds}
          <button onClick={stopCountdown}>Stop</button>
        </div>
      )
    }
    ```
    ## Simple guide to use redux toolkit
    - Add new folder into store folder
      ```
      
      ├── store 
      │    ├── featureFolder(eg. Articles)
      
      ```
    - Add 3 files into your folder
      #### 1. featureSlice.ts (eg. articleSlice.ts)
        in this file contains function createSlice. createSlice function that will auto-generate the action types and action creators, based on the names of the reducer functions you provide. [more info](https://redux-toolkit.js.org/api/createslice)
        - createSlice 
          | Argument | Type       | Nullable? | Description |
          | -------- | ---------- | --------- | ------- |
          | name    | `string`   | No       |   name to identify the slice |
          | inititalState    | `object or any`   | No       |   initial state value |
          | reducer    | `object`   | No       |   An object containing Redux "case reducer" functions (functions intended to handle a specific action type, equivalent to a single case statement in a switch). |
          | extraReducer    | `object`   | No       |   a function that receives a parameter called builder. The builder object provides methods that let us define additional case reducers that will run in response to actions defined outside of the slice. We'll use builder.addCase(actionCreator, reducer) to handle each of the actions dispatched by our async thunks. |
      
      #### **Example**
      
      ```ts
      import { createSlice, isAnyOf } from '@reduxjs/toolkit'
      import {getArticles, addArticle, updateArticle, deleteArticle} from './articlesThunk';

      const initialState = {
        articles: [],
        loading: false,
        error: {}
        }

        export const articleSlice = createSlice({
        name: 'articles',
        initialState,
         reducers: { resetState: () => initialState },
        extraReducers: builder => {
          builder.addCase(getArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload.data;
          });
          builder.addCase(addArticle.fulfilled, state => {
            state.loading = false;
          });
          builder.addCase(updateArticle.fulfilled, state => {
            state.loading = false;
          });
          builder.addMatcher(
            isAnyOf(updateArticle.rejected, getArticles.rejected,
              addArticle.rejected, deleteArticle.rejected), (state, action) => {
              state.loading = false;
              state.error = action.payload
            });
          builder.addMatcher(
            isAnyOf(updateArticle.pending, getArticles.pending,
              addArticle.pending, deleteArticle.pending), state => {
              state.loading = true;
              state.error = initialState.error;
            });
        }
      });
      export const { resetState } = articleSlice.actions;
      ```
      #### 2. featureThunk.ts (eg. articleThunk.ts)
      in this file contains a collection async function that call [thunk](#utilities-functions) function
      #### **Example**

      
      ```ts
      import { endpoints } from 'constant';
      import { thunkUtils } from 'utils';

      export const getArticles = thunkUtils({
        type: 'articles/getArticles',
        method: 'GET',
        endpoint: endpoints.article,
      });

      ```
      #### 3. index.ts
      entry file for the feature
      ```
      
      ├── store 
      │    ├── Article
                  ├── articleSlice.ts
                  ├── articleThunk.ts
                  ├── index.ts
      ```

     - add action into `store/action.ts`
        #### **Example**

        
        ```ts
        const reducers = combineReducers({
            [articleSlice.name]: articleSlice.reducer,
            [userSlice.name]: userSlice.reducer,
            [yourSlice.name]: yourSlice.reducer,
        });
        ```
    - add reducer into `store/index.ts`
      #### **Example**

      
      ```ts
      const reducers = combineReducers({
          [articleSlice.name]: articleSlice.reducer,
          [userSlice.name]: userSlice.reducer,
          [yourSlice.name]: yourSlice.reducer,
       });
      ```
    - Finish

    
    

