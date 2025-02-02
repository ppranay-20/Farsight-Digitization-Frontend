export interface PageResponse {
    id: string;
    instanceId: string;
    pageNumber: string;
    identifiedComponentId: string;
    processingStatus: string;
    embeddingId: string;
    metadata: any;
    createdAt: string;
};

interface ValidationRule {
    Key: string;
    Value: string;
}

interface ExtractionHint {
    Key: string;
    Value: string;
}

export interface Field {
    id: string;
    componentId: string;
    name: string;
    fieldType: string;
    required: boolean;
    validationRules: ValidationRule[];
    extractionHints: ExtractionHint[];
    createdAt: string;
}

export interface UserResponse {
    id: string;
    user_id: string;
    doc_instance_id: string;
    template_component_id: string;
    response_text: ResponseText[];
    embedding_id: string;
    verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface FieldValue {
    value: string
    coordinates: (string | number)[];
    instance_page_id: string;
}

export interface ResponseText {
    [key: string]: FieldValue
}
