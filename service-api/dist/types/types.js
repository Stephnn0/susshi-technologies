"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategory = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Processing"] = "Processing";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Completed"] = "Completed";
    OrderStatus["Canceled"] = "Canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var ServiceCategory;
(function (ServiceCategory) {
    ServiceCategory["AUTOMATION"] = "automation";
    ServiceCategory["INDUSTRY"] = "industry";
    ServiceCategory["SECURITY"] = "security";
    ServiceCategory["AI"] = "ai";
    ServiceCategory["ANALYTICS"] = "analytics";
    ServiceCategory["SUSTAINABILITY"] = "sustainability";
    ServiceCategory["INFRASTRUCTURE"] = "infrastructure";
    ServiceCategory["DATABASES"] = "databases";
    ServiceCategory["SERVERS"] = "servers";
    ServiceCategory["DEVOPS"] = "devops";
    ServiceCategory["QUANTUM"] = "quantum";
    ServiceCategory["BLOCKCHAIN"] = "blockchain";
})(ServiceCategory || (exports.ServiceCategory = ServiceCategory = {}));
//# sourceMappingURL=types.js.map