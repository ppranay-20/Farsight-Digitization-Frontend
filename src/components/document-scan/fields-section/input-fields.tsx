"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pagination from "./pagination";
import { useEffect, useState } from "react";
import { Field, UserResponse } from "@/types/document-action";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSelectedField } from "../../../context/select-field-context";

interface InputFieldProps {
  fields: Field[];
  userResponse: any;
  isLastRow: boolean;
  onNextRow: (data: any) => void;
  onSaveAllData: (data: any) => void;
}

export default function InputFields({
  fields,
  userResponse,
  isLastRow,
  onNextRow,
  onSaveAllData,
}: InputFieldProps) {
  const { selectedField, setSelectedField } = useSelectedField();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleFields = fields.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(fields.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getValidationRules = (field: Field) => {
    const rules: any = {};

    field.validationRules.forEach((rule) => {
      switch (rule.Key) {
        case "required":
          rules.required =
            rule.Value === "true" ? "This field is required" : false;
          break;
        case "maxLength":
          rules.maxLength = {
            value: Number(rule.Value),
            message: `Maximum length is ${rule.Value} characters`,
          };
          break;
        case "minLength":
          rules.minLength = {
            value: Number(rule.Value),
            message: `Minimum length is ${rule.Value} characters`,
          };
          break;
      }
    });

    return rules;
  };

  const onSubmit = (data: any) => {
    if (isLastRow) {
      onSaveAllData(data);
    } else {
      onNextRow(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="min-h-[270px] max-h-[270px] overflow-y-auto flex flex-col gap-6 px-1">
        {visibleFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-sm font-medium leading-4">
              {field.name}
            </Label>
            <Input
              type={field.fieldType}
              id={field.id}
              {...register(field.name, getValidationRules(field))}
              className={cn(
                "w-full text-text-active",
                errors[field.name] && "border-error-border"
              )}
              defaultValue={userResponse[field.name].value}
              onFocus={() => setSelectedField({
                name: field.name,
                coordinates: userResponse[field.name].coordinates,
              })}
              // onBlur={() => setSelectedField(null)}
            />
            {errors[field.name] && (
              <p className="text-error-text text-xs h-0.5">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
      <div>
        <Button
          className="bg-green-500 py-2 px-2 text-overflow font-inter text-sm font-medium leading-6 w-full hover:bg-none"
          type="submit"
        >
          {isLastRow ? "Save" : "Next"}
        </Button>
      </div>
    </form>
  );
}
