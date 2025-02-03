'use client'

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InputFields from "./input-fields"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Field, UserResponse } from "@/types/document-action"
import { updateUserResponse } from "@/actions/documents"

interface FieldsSectionProps {
  fields: Field[]
  userResponse: UserResponse
}

export default function RenderFields({ fields, userResponse }: FieldsSectionProps) {
  const [selectedRow, setSelectedRow] = useState("row-1");
  const totalRows = userResponse.response_text.length;
  const showDropdown = totalRows > 5;
  const currentRowIndex = parseInt(selectedRow.split('-')[1]) - 1
  const isLastRow = totalRows-1 === currentRowIndex;
  const [formData, setFormData] = useState<any>([]);

  const handleRowChange = (value: string) => {
    setSelectedRow(value)
  }

  const handleNextRow = (data: any) => {
    setFormData((prev: any) => {
        const newData = [...prev];
        newData[currentRowIndex] = data;
        return newData;
    });

    const nextRow = `row-${currentRowIndex + 2}`
    setSelectedRow(nextRow)
  }

  const handleSaveAllData = async (lastRowData: any) => {
    // Add the last row's data and submit everything
    const allData = [...formData]
    allData[currentRowIndex] = lastRowData;

    // Update the user response with the new data
    const newUserResponse = {
      ...userResponse,
      response_text: allData
    };

    console.log("New user Response", newUserResponse);

    // try {
    //   const response = await updateUserResponse(newUserResponse);
    //   if(response) {
    //     console.log("User response updated successfully", response);
    //   }
    // } catch(err) {
    //   console.error("An error occurred while saving the data", err);
    // }
  }



  if (showDropdown) {
    return (
      <div className="max-w-md py-16 mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-baseline">
            <h5 className="text-lg font-normal leading-[22px] tracking-tighter">
              Verify Output
            </h5>
            <Select value={selectedRow} onValueChange={handleRowChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Row" />
              </SelectTrigger>
              <SelectContent>
                {userResponse.response_text.map((_, index) => (
                  <SelectItem key={index} value={`row-${index + 1}`}>
                    Row {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            {userResponse.response_text.map((item, index) => (
              <div
                key={index}
                className={selectedRow === `row-${index + 1}` ? "block" : "hidden"}
              >
                <InputFields fields={fields} userResponse={item} isLastRow={isLastRow} onNextRow={handleNextRow} onSaveAllData={handleSaveAllData} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default tabs view for 5 or fewer rows
  return (
    <div className="max-w-md py-16 mx-auto w-full">
      <Tabs value={selectedRow} onValueChange={handleRowChange} defaultValue="row-1" className="flex flex-col gap-6">
        <div className="flex gap-3 items-baseline">
          <h5 className="text-lg font-normal leading-[22px] tracking-tighter">
            Verify Output
          </h5>
          <TabsList>
            {userResponse.response_text.map((_, index) => (
              <TabsTrigger key={index} value={`row-${index + 1}`}>
                Row {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div>
          {userResponse.response_text.map((item, index) => (
            <TabsContent key={index} value={`row-${index + 1}`}>
              <InputFields fields={fields} userResponse={item} isLastRow={isLastRow} onNextRow={handleNextRow} onSaveAllData={handleSaveAllData} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}