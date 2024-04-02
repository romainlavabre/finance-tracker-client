import authentication from "./authentication";
import map from "./map";
import intervention from "./intervention";
import humanResourceRequestedDocument from "./human-resource/requestedDocument";
import humanResourceNotification from "./human-resource/notification";
import legalDocument from "./legalDocument";
import message from "./message";
import qualityInspection from "./qualityInspection";
import interventionDocument from "./interventionDocument";
import history from "./history";
import payment from "./payment";
import saleInvoice from "./invoice/saleInvoice";
import quotation from "./quotation";
import purchaseInvoice from "./purchaseInvoice";
import credit from "./credit";
import signature from "./signature";
import kpi from "./kpi";
import diagnostic from "./diagnostic.js";
import statistic from "./statistic.js";
import profile from "./profile.js";
import orderInvoice from "./orderInvoice.js";
import authClient from "./authClient.js";
import certificate from "./certificate.js";
import partner from "./partner.js";
import attachment from "./attachment";
import issue from "./issue";
import identity from "./identity";
import prescriberStandardizedItem from "./prescriberStandardizedItem";
import b2csduIntervention from "./b2csdu/intervention";
import order from "./b2csdu/order";
import zonedItem from "./emergency/zonedItem";
import pagination from "./data-repository/pagination";
import b2cIntervention from "./b2c/intervention";
import openDocument from "./openDocument";
import company from "./user/company";
import artisan from "./user/artisan";
import conversation from "./internal-messaging/conversation";
import notification from "./internal-messaging/notification";
import recipient from "./internal-messaging/recipient";
import technicalSupport from "./technicalSupport";
import folder from "./human-resource/folder";
import file from "./human-resource/file";
import salary from "./human-resource/Salary";
import requestedDocument from "./requestedDocument";
import genesys from "./call-center/genesys";
import incomingCall from "./call-center/incomingCall";
import emergencyStandardizedItem from "./emergency/standardizedItem";
import freeping from "./freeping";
import emergencyOrder from "./emergency/order";

const api = {
    authentication,
    map,
    intervention,
    quotation,
    requestedDocument: requestedDocument,
    legalDocument: legalDocument,
    message: message,
    qualityInspection: qualityInspection,
    history: history,
    payment: payment,
    saleInvoice: saleInvoice,
    purchaseInvoice: purchaseInvoice,
    credit: credit,
    signature,
    interventionDocument,
    kpi: kpi,
    statistic,
    profile,
    orderInvoice,
    diagnostic,
    authClient,
    certificate,
    partner,
    attachment,
    issue,
    identity,
    openDocument,
    freeping,
    prescriberStandardizedItem: prescriberStandardizedItem,
    technicalSupport: technicalSupport,
    dataRepository: {
        pagination
    },
    b2csdu: {
        intervention: b2csduIntervention,
        order: order
    },
    emergency: {
        zonedItem: zonedItem,
        standardizedItem: emergencyStandardizedItem,
        order: emergencyOrder
    },
    b2c: {
        intervention: b2cIntervention
    },
    invoice: {
        saleInvoice: saleInvoice
    },
    user: {
        legalDocument: legalDocument,
        company: company,
        artisan: artisan
    },
    internalMessaging: {
        conversation: conversation,
        notification: notification,
        recipient: recipient
    },
    humanResource: {
        folder: folder,
        file: file,
        salary: salary,
        requestedDocument: humanResourceRequestedDocument,
        notification: humanResourceNotification
    },
    callCenter: {
        genesys: genesys,
        incomingCall: incomingCall
    }
};

export default api;
