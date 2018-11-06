# cli_sql_store
Command-Line-Interface with a virtual online store. Data hosted in local MySQL server.

Database Structure:

The database store_db currently contains two tables:

  Store Table-
    This contains all of the items sold by this applications online store. The customer will have read access and will be able to affect the inventory levels as well as the total sales values. Manager will have read access as well as the ability to edit items host in the online store and add new items. Supervisors will be able to access profit levels as derived from the total sales stored in this table.

    DATA: 
      *PRODUCT ID
      *PRODUCT NAME
      *DEPARTMENT
      *PRICE
      *INVENTORY LEVEL
      *TOTAL SALES
    
  Department Table-
    This contains a record of all of the different department categories of goods sold in the online store. It also contains information regarding the cost of goods on hand. This table is only accessible at the supervisor level and is read only. It is used to determine overall profitablility by department.

    DATA:
      *DEPARTMENT ID
      *DEPARTMENT NAME
      *DEPARTMENT OVERHEAD COST

  There are three main levels of functionality that this application contains. Upon launch, user is directed to a virtual storefront where they will be prompted to pick from a list of access levels:

## CUSTOMER LEVEL ACCESS

As a customer in my application, users will have access to the information stored in the "store" table. Upon entering through the virtual storefront, the customer will be greeted by a table display of all of the products currently for sale in the store. The table will allow them to see information about price as well as the inventory of each product on hand. From this point, the customer can select an item by "item ID" and decide the quantity of that item that they would like to purchase. 

After completing their order, their order total will be displayed for them and they will be able to continue shopping. Their order will update the inventory and total sales in the database table and also in the user table display.

## MANAGER LEVEL ACCESS

As a manager, the user will have more functionality than at the customer level. There are four functions available for managers:

  ### VIEW CURRENT PRODUCTS

  As is important for all managers, knowing what products are currently available is crucial. Selecting this option when prompted will display the most current data from the "store" table in the database, much the same way customers will be able to access this information.

  ### VIEW LOW INVENTORY

  When prompted, selecting this option will allow managers to quickly see which items in the online store are currently running low on inventory. "Low Inventory" is currently defined as any item with fewer than five left in stock. These items will be displayed in a new, red, low-inventory table. If no items are running low on inventory, the manager will be notified with a cheery, green message notifying them of such.

  ### ADD INVENTORY

  Upon learning of items with low quantities, the manager may choose this option to restock specific items. By entering the "product ID" of the items they wish to restock, managers are then able to add to the inventory level by entering a quantity in the next option.

  ### ADD ITEM

  When it is time to add new items to the store, manager-level access will grant the user the ability to update the database to store information about the new item for access at all levels, most importantly for the customer-user to purchase. Managers will be prompted to enter the name of the new item and then given a list of available departments to further categorize the new item. They will then be able to set a price for the item and choose a starting inventory level depending on the stock on hand. Total sales for new items will default to zero until a purchase is made and the product will be added to the bottom of the "store" table.

## SUPERVISOR LEVEL ACCESS

As an owner, it is important to keep an eye on your business and its financials. Entering the storefront through this access level will give the user the ability to check the profitability of their store in a consice table which summarizes the overhead costs, total sales and total profit of each department.

### ADDITIONAL FEATURES

The following features are easy additions which will make this virtual store even more user friendly and efficient in the future:

  *User authentication for high-level access
  *Supervisor ability to add departments
  *User shopping cart and checkout confirmation
  *User ability to sort table display


## FULL VIDEO WALKTHROUGH

https://drive.google.com/file/d/1ULzWMoVMIhvxuKCmlqM8uQIq7PhCqmcV/view?usp=sharing

   