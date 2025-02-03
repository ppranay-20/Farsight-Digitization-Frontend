'use server'

import { Field, PageResponse, UserResponse } from "@/types/document-action";

export async function getPagesFromDocumentInstance(instanceId: string): Promise<PageResponse[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/document-instances/${instanceId}/pages`);
        if(!response.ok) {
            throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("An error Occured while fetching images");
    }
}

export async function getImagesFromPages(instanceId: string, pageId1: string, pageId2: string): Promise<{ leftImage: string, rightImage: string }> {
    try {
        // First fetch raw image
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/instance-pages/raw/${instanceId}/${pageId1}`);
        if(!response.ok) {
            throw new Error("Failed to fetch raw image");
        }
        const leftImage = await response.json();
        if(!leftImage) {
            throw new Error("Failed to fetch image 1");
        }

        // Then fetch processed image
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/instance-pages/raw/${instanceId}/${pageId2}`);
        if(!response2.ok) {
            throw new Error("Failed to fetch image 2");
        }
        const rightImage = await response2.json();
        if(!rightImage) {
            throw new Error("Failed to fetch image 2");
        }

        // Return only when both images are successfully fetched
        return {
            leftImage,
            rightImage
        };
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching images");
    }
}

export async function getTemplateFields(templateId: string): Promise<Field[]> {
    const requiredFields: Field[] = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/template-fields`);
        if(!response.ok) {
            throw new Error("Failed to fetch fields");
        };

        
        const data = await response.json();
        data.forEach((field: Field) => {
            if(field.componentId === templateId) {
                requiredFields.push(field);
            }
        });

        return requiredFields;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching fields");
    }
}

export async function getUserResponse(instancePageId: string): Promise<UserResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-responses/${instancePageId}`,{
            cache: 'force-cache'
        });
        if(!response.ok) {
            throw new Error("Failed to fetch user response");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching user response");
    }
}

export async function getProcessedImage(instanceId: string, pageId1: string, pageId2: string): Promise<{ leftImage: string, rightImage: string }> {
    try {
        // First fetch raw image
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/instance-pages/processed/${instanceId}/${pageId1}`);
        if(!response.ok) {
            throw new Error("Failed to fetch raw image");
        }
        const leftImage = await response.json();
        if(!leftImage) {
            throw new Error("Failed to fetch image 1");
        }

        // Then fetch processed image
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/instance-pages/processed/${instanceId}/${pageId2}`);
        if(!response2.ok) {
            throw new Error("Failed to fetch image 2");
        }
        const rightImage = await response2.json();
        if(!rightImage) {
            throw new Error("Failed to fetch image 2");
        }

        // Return only when both images are successfully fetched
        return {
            leftImage,
            rightImage
        };
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching images");
    }
}

export async function updateUserResponse(userResponse: UserResponse) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-responses`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userResponse)
        });
        
        if(!response.ok) {
            throw new Error("Failed to update user response");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating user response");
    }
}
