# Fetch Frontend Take-Home Exercise

## Project Overview

While I'm primarily an engineer rather than a designer, I have a solid understanding of UI/UX fundamentals and have collaborated with talented designers throughout my career to create intuitive user experiences.

### Architecture & Implementation

For this challenge, I implemented a tab-based architecture to logically organize different data views and user interactions. The application features:

- **Comprehensive Dog Search**: Users can browse dogs with robust filtering capabilities including:

  - Breed selection (multi-select)
  - Age range filtering
  - Location-based search using city/state pairs
  - Pagination with optimized data loading
  - Flexible sorting on any field

- **User Interaction Flow**: The app allows users to:
  - Add/remove dogs to a favorites list (with persistent storage)
  - Request a match from their curated favorites list
  - Navigate between different views while maintaining state

### Technical Highlights

I approached this project with scalability and maintainability in mind:

- **State Management**: Implemented context-based state management with React's Context API for clean data flow
- **Data Fetching**: Utilized React Query for efficient data fetching, caching, and synchronization
- **Component Architecture**: Created reusable components with clear separation of concerns
- **UI Framework**: Leveraged Material UI for consistent styling and accessible components
- **Animations**: Added subtle animations with Motion to enhance the user experience
- **Type Safety**: Implemented TypeScript throughout for improved code quality and developer experience

### API Integration

The application intelligently integrates with multiple endpoints:

- Dynamically converts city/state selections into zip codes for the search API
- Implements efficient pagination and filtering directly through API parameters
- Handles authentication and session management

### Reflections

While I'm pleased with the implementation, with additional time I would have enhanced the routing system. I began implementing a more robust React Router solution to persist search parameters in the URL and enable better navigation between tabs, but prioritized core functionality due to time constraints. The commit history shows my initial work in this direction.

This approach would have further improved the user experience by:

- Enabling direct linking to specific searches
- Supporting browser navigation history

## Setup

Install the dependencies:

```bash
yarn install
```

## Get started

Run Dev:

```bash
yarn dev
```

Build the app for production:

```bash
yarn build
```
