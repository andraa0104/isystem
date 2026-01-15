import QuotationController from './QuotationController'
import PurchaseRequirementController from './PurchaseRequirementController'
import PurchaseOrderController from './PurchaseOrderController'
import DeliveryOrderController from './DeliveryOrderController'
const Marketing = {
    QuotationController: Object.assign(QuotationController, QuotationController),
PurchaseRequirementController: Object.assign(PurchaseRequirementController, PurchaseRequirementController),
PurchaseOrderController: Object.assign(PurchaseOrderController, PurchaseOrderController),
DeliveryOrderController: Object.assign(DeliveryOrderController, DeliveryOrderController),
}

export default Marketing