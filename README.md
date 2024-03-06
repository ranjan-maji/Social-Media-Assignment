# Social-Media-Assignment



The details of the Assignment:

## Task 1: User Authentication API

 

- Create an API endpoint for user registration, allowing users to sign up with their email and password.

- Implement JWT (JSON Web Tokens) authentication for user login.

- Ensure proper validation of input data and secure storage of user credentials.

- Provide JWT tokens upon successful authentication for subsequent API requests.

 

## Task 2: Friend Request System API

 

- Create APIs for sending friend requests between users.

- Include functionality to show the status of friend requests (e.g., pending, accepted, rejected).

- Ensure that users can only send friend requests to authenticated users.

- Implement appropriate mechanisms to handle friend request status changes based on user actions.

 

## Task 3: Group Management API with Post Visibility

 

Extend the group management API to ensure that only members of a specific group can view and interact with the posts within that group.

 

### 1. Create Group API Endpoints:

    - Develop endpoints to create a new group, add members to the group, and invite members to join the group.

    - Implement authentication to ensure that only authenticated users can create or manage groups.

### 2. Post Management within Groups:

    - Integrate post management functionalities within groups.

    - Each post should belong to a specific group, and only members of that group can view and interact with the post.

    - Implement endpoints for creating, editing, and deleting posts within a group.

### 3. Post Visibility Restrictions:

    - Ensure that posts are visible only to members of the group to which they belong.

    - Implement access control mechanisms to restrict access to post-related endpoints based on group membership.

    - Authenticate users and validate their membership status before allowing them to view, create, edit, or delete posts within a group.

   

