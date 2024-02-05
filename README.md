# FED-Assignment2
# Star Jewelry Inc.

## Project Overview

Star Jewelry Inc. brings the allure and beauty of fine jewelry directly to the consumer in an interactive and engaging online experience. Our mission is to provide an unparalleled shopping experience that offers personalized, high-quality jewelry for every occasion. We believe that purchasing jewelry should be as memorable as the moments they signify.

Our platform is designed not just to sell jewelry but to create a community of jewelry lovers who appreciate the excitement of discovery and the joy of rewards. Through innovative features like our monthly leaderboard, a quiz to find out more about us and our products, and a reward wheel for different spending levels, we ensure a delightful and engaging experience for every customer.

## Design Process

This website is for jewelry enthusiasts who are looking for a personalized shopping experience that matches their unique style and preferences. They want to discover and purchase jewelry with ease, get rewarded for their loyalty, and feel a sense of community.

To ensure the website meets these needs, we followed a user-centered design process:

### User Stories

- As a **new visitor**, I want to understand the types of jewelry offered, so that I can decide if they match my taste.
- As a **shopper**, I want to quickly find pieces that appeal to me, so that I can minimize the time spent searching.
- As a **returning customer**, I want to feel valued and have opportunities to receive rewards, so that I am incentivized to remain loyal to the brand.
- As a **competitive buyer**, I want to see how my purchases stack up against others, so that I can participate in friendly competition and potentially receive prizes.

### Wireframes and Mockups

You can find the wireframes in the wireframes folder in the repository. These were integral in visualizing the customer journey and iterating on the design for optimal user experience.

## Features

- **Product Catalogue** - Allows users to browse an extensive collection of jewelry and select items that appeal to them. Includes category filters, sorting by price, and an option to view the prices in SGD, MYR or IDR, the countries that we provide services for.
- **Gift Wheel** - Users who spend over a certain amount can spin the wheel to win a free gift, adding an element of surprise and delight.
- **Quiz** - Engages users with questions about our products, prices, return policy, and company information, reinforcing their knowledge and our brand's transparency.
- **Monthly Leaderboard** - Encourages friendly competition and more spending by rewarding the top spenders each month.


## Technologies Used

- **JavaScript**: Empowers the interactivity of the web application by handling events, manipulating the DOM, and managing asynchronous API calls.

- **Local Storage**: Provides persistent data storage within the user's browser to retain cart and user state between page refreshes.

- **RESTful API**: Interfaces with backend services for data operations, following REST principles for a stateless client-server architecture.

- **Fetch API**: Handles HTTP requests for asynchronous operations to retrieve from and send data to the server in JSON format.

- **Async/Await**: Syntactic sugar in JavaScript for working with promises in an easier-to-read synchronous manner, enhancing code clarity especially in asynchronous functions.

- **Event Listeners**: JavaScript methods attached to DOM elements that listen for events such as 'click' and 'DOMContentLoaded', triggering specific callbacks.

- **DOM Manipulation**: Dynamic manipulation of the DOM allows the application to update the content, structure, and style of the webpage without reloading.

- **Canvas API**: Utilized for drawing the interactive 'spin the wheel' feature, enabling graphical content directly in the browser.

- **ExchangeRate API**: Utilized for showing the currency conversions on our products page.

- **Sorting Algorithms**: Implemented to organize leaderboard data, ensuring that users are listed according to their scores or other criteria.

- **Regular Expressions**: Used to validate user input formats, such as email addresses during account creation or sign-in processes.

- **Lottie Animations (dotlottie-player)**: LottieFiles animations enhance the visual feedback during user interactions, providing a more engaging user experience.

- **Promises**: Ensure reliable execution of asynchronous code, with `then()` and `catch()` methods for handling the fulfilled and rejected states.

- **CSS**: Styles the application's presentation layer, providing a polished and responsive user interface.

- **Bootstrap and Bootstrap Icons**: A library of CSS/JS code and icons used throughout the application for intuitive navigation and interaction cues.


## External Source Code

This project incorporates code and libraries from external sources to enhance functionality and user experience:

- **RestDB API**: We use RestDB for database services, allowing us to store and retrieve data dynamically. RestDB provides a simple and intuitive way to work with our application data through RESTful endpoints. More information can be found at [RestDB.io](https://restdb.io/).

- **ExchangeRate-API**: For real-time currency conversion features, we integrate with ExchangeRate-API. This allows our application to display product prices in multiple currencies based on the latest exchange rates. Documentation and usage guidelines are available at [ExchangeRate-API](https://www.exchangerate-api.com/).

- **Canvas API**: The core technology behind our dynamic graphics. More information and documentation can be found at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

- **Bootstrap**: For user interface, we utilize [Bootstrap](https://getbootstrap.com/), a comprehensive open-source frontend code library.

- **Bootstrap Icons**: For user interface icons, we utilize [Bootstrap Icons](https://icons.getbootstrap.com/), a comprehensive open-source icon library.

- **LottieFiles Animations**: Interactive animations are powered by [LottieFiles](https://lottiefiles.com/), which provides lightweight, scalable animations.

- **dotlottie-player**: For embedding Lottie animations, the [dotlottie-player](https://dotlottie.io/) is employed for its ease of integration and compatibility with web standards.


## Testing

### Manual Testing Scenarios

- **Product Selection:**
  - Add an item from the 'Products' page to cart, using quantity increment button.
  - Verify that quantity text changes, and product is added to cart.
- **Gift Wheel:**
  - Spend the required amount and verify the wheel triggers correctly.
  - Spin the wheel and verify that the gift corresponds to the spending bracket.
- **Quiz:**
  - Participate in the product knowledge quiz, ensuring accurate scoring and appropriate application of rewards based on quiz performance.
  - Ensure that discount shows on cart page.
- **Cart:**
  - Add to cart and check out
- **Leaderboard**
  - Ensure user details are displayed correct and in order.
  - Register or sign in on leaderboard form, and check that the entry is registered or updated with correct spent total.

### Responsiveness and Browser Compatibility

- Tested on various browsers including Chrome, Firefox, and Safari.
- Responsive design was checked on multiple devices and screen sizes to ensure compatibility.


## Credits

### Media

- The product photos used in this site were obtained from https://pohheng.com.sg/
- The iPad Pro photos were obtained from [Apple's official site](https://www.apple.com/sg/ipad-pro/).
- Social media icons were taken from [IconFinder](https://www.iconfinder.com/).

### Acknowledgements

- We drew inspiration from various luxury e-commerce platforms to create an elegant and user-friendly interface.
- We also referenced tutorials from various sources, such as [freeCodeCamp.org](https://www.youtube.com/c/Freecodecamp).

