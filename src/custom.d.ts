declare module "*.svg" {
    const content: any;
    export default content;
}

declare namespace env {
    const applicationID: string;
    const searchOnlyAPIKey: string;
    const index_name: string;
}