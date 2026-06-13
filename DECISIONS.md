# Architectural Decisions

One architectural decision I spent time considering was how to manage global application state. The application needs cart management, cart persistence, cart badge updates, drawer visibility, and access to shared state from multiple pages. I considered using either React Context API or a dedicated state management solution such as Redux Toolkit.

Redux Toolkit would provide a structured approach for managing state as the application grows, especially if additional features such as authentication, checkout flows, wishlists, and API caching were introduced. However, it would also add additional setup, boilerplate, and complexity for a relatively small application.

I chose React Context API because the current requirements only involve a shopping cart and a small amount of shared UI state. Context provides a lightweight solution that keeps the code easy to understand while still supporting persistence through localStorage. To keep responsibilities separated, I created independent contexts for cart state and UI state rather than placing everything into a single global store.

Another challenge was product variants. The assignment requires color selection, size selection, stock states, and deep-linkable variant URLs, but the Fake Store API does not provide variant information. Instead of removing those requirements, I introduced a local variant data layer that supplies color, size, and stock information while keeping the UI components independent from the data source. This approach would allow a future API integration with minimal changes to the component structure.

With additional time, I would improve loading and error states, add unit tests around variant selection and cart behaviour, implement toast notifications for cart actions, and connect the variant data to a real backend service. I would also add stronger accessibility testing and more comprehensive responsive testing across a wider range of devices.

The overall goal was to keep the application modular, maintainable, and aligned with the assignment requirements while making practical implementation decisions where external API limitations existed.
