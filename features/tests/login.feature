Feature: Login functionality

  Background: Run background before each scenario
    Given I open a book store application page
    When I clicked a "loginMenu" button on the left navigation bar
    Then I validate redirection to the "login" page

  Scenario: As a registered user, I log in to the application
    When I sign in the application using login "ser1" and password "Cc1234567899!"
    Then I validate redirection to the "profile" page

  Scenario Outline: As a user with invalid credentials, I log in to the application
    When I sign in the application using invalid login "<login>" and password "<password>"
    Then I validate that the output text is "Invalid username or password!"

    Examples:
      | login | password      |
      | ser1  | Cc123456789!  |
      | ser2  | Cc1234567899! |

  Scenario: As a signed in user, I log out from the application
    When I sign in the application using login "ser1" and password "Cc1234567899!"
    Then I validate redirection to the "profile" page
    When I sign out from the application
    Then I validate redirection to the "login" page