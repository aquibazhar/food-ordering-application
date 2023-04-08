<h1 align="center">Foody</h1>
Foody is a food ordering web application built using Angular and Spring Boot, utilizing Microservices architecture.

## Features 🚀

- User can view all restaurants within a 20-kilometer radius.
- Users can sign up or sign in as customers.
- Users can click on available restaurants on the homepage to go to that specific restaurant's page or use the search bar to look for food items/restaurants.
- Users can add food items to their cart from the restaurant's page, and navigate through different sections of the restaurant's page by clicking on cuisines listed on the left side.
- Users can search for food items within the restaurant.
- Users can select a delivery address and proceed to payment using a dummy payment gateway (Razorpay).
- Users can view the status of their order on the order status page, which includes waiting for the restaurant to accept, accepted by the restaurant, picked up, and delivered.
- Once the status of the order is changed to delivered, the user is redirected to the homepage.
- Users have a profile section where they can change their password, edit their profile details such as name, add new delivery addresses, and view their previous orders.
- If a user goes to the "add restaurant" page and successfully adds their restaurant, their role is updated to restaurant owner.
- Restaurant owners can add or remove menu items and view orders placed in their restaurant from the restaurant dashboard.
- Restaurant owners can manually accept and update the status of orders from the dashboard.
- Restaurants are not listed on the homepage until they are approved by the admin.
- The admin can approve, unlist, and remove restaurants from the platform.

## Architecture 🏛️

This food ordering application is built using microservices architecture. There are six microservices that are used in the project, which include:
- **user-service**: This microservice is responsible for user authentication, user registration, and user profile management.
- **restaurant-service**: This microservice is responsible for managing restaurant details, such as restaurant location,restaurant address.
- **food-item-service**: This microservice is responsible for managing food items of the restaurants, such as name, description, and price.
- **cart-service**: This microservice is responsible for managing the user's cart, including adding and removing items.
- **order-service**: This microservice is responsible for managing orders, including placing orders, updating order status, and payment.
- **admin-service**: This microservice is responsible for managing administrative tasks, such as approving restaurants and managing users.

Following Spring Cloud features were used to implement the microservices architecture.
- [Spring Cloud Netflix](https://spring.io/projects/spring-cloud-netflix): To enable service registration and discovery, making it easier to manage the microservices.
- [Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign): To estabilish communication between the microservices. Additionally, it has built-in client side load balancing capabilities that distribute traffic across multiple instances of a microservice to improve performance and resilience.
- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway): To handle incoming requests and route them to the appropriate microservice and also provide server side load balancing.
- [Spring Cloud Config](https://spring.io/projects/spring-cloud-config):  was implemented to store and manage configuration properties like database connection details and eureka server details in a centralized location.
- [Spring Cloud Circuit Breaker](https://spring.io/projects/spring-cloud-circuitbreaker): To improve the application's fault tolerance and resilience in case of failures or errors.

## Built with 🛠️

- Angular
- Angular Material
- Typescript
- HTML
- CSS
- [Leaflet](https://leafletjs.com/)
- Java
- Spring Boot
- [Spring Cloud](https://spring.io/projects/spring-cloud)
- MySQL
- Junit and Mockito

## Testing and Code Coverage

- **Backend Code Coverage**: We used JaCoCo to generate code coverage reports for the back-end microservices.
- **Backend Unit Tests**: We wrote unit tests for the back-end microservices using JUnit and Mockito.

## What's missing❓

### Restaurant ratings 

Implement a rating system where users can rate and review restaurants based on their food quality, portion and cost.

### Discounts and offers

Offer users discounts, deals, and promotional offers.

### Delivery tracking

Allow users to track the delivery partner in real-time and automatically update the order status.



## Support 🤝

Give a ⭐️ if you like this project!

Thanks a lot for stopping by and supporting me!
