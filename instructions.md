https://www.reddit.com/r/reactjs/comments/rz8928/can_anyone_share_a_project_repo_that_uses_react/
https://medium.com/@jdhawks/redux-toolkit-and-rtk-query-with-react-js-14e34be65622
https://github.com/AlexNti/coin_market/tree/master/src

Pagination

https://github.com/alan2207/bulletproof-react/blob/master/src/features/comments/components/CommentsList.tsx

https://stackoverflow.com/questions/69499487/rtk-query-pagination-and-combine-queries

https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-3/

https://stackblitz.com/edit/react-jh83ue?file=src%2Fcomponents%2FTodoList.js,src%2Fredux%2Fslices%2FtodoSlice.js

condition ? <ConditionalComponent /> : null;

https://7dec9s.csb.app/

Filter

https://codesandbox.io/s/countrieslist-rtk-query-b1ix4d?file=/src/App.js
https://github.com/aroyan/countries-lists/blob/dev/src/features/countries.js

https://stackoverflow.com/questions/74328848/how-to-filters-by-category-using-redux-toolkit-in-reactjs

# Background:

PHP, JQUERY code.
Totally a Newbie to ReactJS & API.

# This React Client consumes the following Web API:

POST /api/tutorials create new Tutorial
GET /api/tutorials retrieve all Tutorials
GET /api/tutorials/:id retrieve a Tutorial by :id
PUT /api/tutorials/:id update a Tutorial by :id
DELETE /api/tutorials/:id delete a Tutorial by :id
DELETE /api/tutorials delete all Tutorials
GET /api/tutorials?title=[keyword] find all Tutorials which title contains keyword

# Questions to hemanta.io

## Super helpful tutorial: https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-1/

1. Categories are fetched from blog.state, what about categories that are not yet mapped with any blog post. How to go about getting the categories directly from the mysql db using the /api/ ?

2. How to filter based on category_id from the post, yet display category_name on the menu

3. How to connect PHP REST API for pagination? What changes needs to made in the /api/ folder?
   eg: should i add as query string: read.php?page_no=1&total=20

4. Can I add more filters in addition to category -> how to go about it? such as: by_date, by_post_status, by_label
   eg: /{category_name}/topics/{status:approved}
   eg: /{category_name}/topics/{label:personal}

5. Category filter does not change the route, how to add route change.
   eg: /{category_name}/topics

# OTHER TUTORIALS

https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-2/
https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-3/
https://hemanta.io/implement-server-side-pagination-in-react-with-a-nodejs-backend-api/
https://hemanta.io/react-query-a-guide-to-fetching-data/
https://hemanta.io/implement-user-authentication-and-authorization-in-a-mern-stack-application-part-1/
https://hemanta.io/implement-user-authentication-and-authorization-in-a-mern-stack-application-part-2/
