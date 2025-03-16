"use client";
import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

type FormValues = {
  attributes: { name: string; values: { value: string }[] }[];
  variants: { sku: string; price: string; stock: string }[];
};

const cartesianProduct = (arrays: string[][]) => {
  return arrays.reduce((acc, values) => acc.flatMap((x) => values.map((y) => [...x, y])), [[]] as string[][]);
};

const DynamicAttributesForm: React.FC = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: { attributes: [], variants: [] },
  });

  const {
    fields: attributes,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const { fields: variants, replace: setVariants } = useFieldArray({
    control,
    name: "variants",
  });

  const watchedAttributes = useWatch({ control, name: "attributes" });

  // Cập nhật biến thể khi thuộc tính thay đổi
  useEffect(() => {
    const attributeValues = watchedAttributes
      .map((attr) => attr.values.map((v) => v.value).filter(Boolean))
      .filter((arr) => arr.length > 0);

    if (attributeValues.length > 0) {
      let skus = cartesianProduct(attributeValues);
      setVariants(
        skus.map((comb) => ({
          sku: comb.join(" - "),
          price: "",
          stock: "",
        }))
      );
    }
  }, [watchedAttributes, setVariants]);

  // Xử lý dữ liệu trước khi submit
  const formatData = (data: FormValues) => {
    // Bước 1: Format variants (danh sách thuộc tính)
    const formattedVariants = data.attributes.map((attr) => ({
      name: attr.name,
      values: attr.values.map((v) => v.value),
    }));

    // Bước 2: Format product_variants (biến thể sản phẩm)
    const productVariants = data.variants.map((variant) => {
      const values = variant.sku.split(" - ");
      let variantValues: Record<string, string> = {};

      data.attributes.forEach((attr, index) => {
        variantValues[attr.name] = values[index] || "";
      });

      return {
        sku: values.join("-").toUpperCase().replace(/\s+/g, ""), // SKU dạng "TS-RED-S"
        price: parseInt(variant.price) || 0,
        stock: parseInt(variant.stock) || 0,
        variant_values: variantValues,
      };
    });

    return {
      variants: formattedVariants,
      product_variants: productVariants,
    };
  };

  const onSubmit = (data: FormValues) => {
    const formattedData = formatData(data);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-3">Add variant for product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* THUỘC TÍNH */}
        {attributes.map((attribute, attrIndex) => (
          <div key={attribute.id} className="border p-3 rounded">
            <div className="flex justify-between items-center">
              <input
                {...register(`attributes.${attrIndex}.name`)}
                placeholder="Tên thuộc tính (e.g., Màu sắc, Kích thước)"
                className="border p-2 flex-1"
              />
              <button type="button" onClick={() => remove(attrIndex)} className="text-red-500">
                Delete
              </button>
            </div>

            <ValuesInput control={control} attrIndex={attrIndex} register={register} />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", values: [{ value: "" }] })}
          className="bg-green-500 text-white px-3 py-2"
        >
          Add variant
        </button>

        {/* DANH SÁCH BIẾN THỂ */}
        {variants.length > 0 && (
          <div className="mt-5">
            <h2 className="text-lg font-bold">Variant List</h2>
            {variants.map((variant, index) => (
              <div key={variant.sku} className="flex items-center gap-2 mt-2">
                <span className="border p-2 flex-1">{variant.sku}</span>

                {/* Nhập giá */}
                <input
                  {...register(`variants.${index}.price`)}
                  placeholder="Nhập giá"
                  className="border p-2 w-24"
                  type="number"
                />

                {/* Nhập tồn kho */}
                <input
                  {...register(`variants.${index}.stock`)}
                  placeholder="Nhập tồn kho"
                  type="number"
                  className="border p-2 w-24"
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white px-3 py-2 mt-3">
          Gửi Dữ Liệu
        </button>
      </form>
    </div>
  );
};

// Component nhập giá trị thuộc tính
const ValuesInput = ({ control, attrIndex, register }: { control: any; attrIndex: number; register: any }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `attributes.${attrIndex}.values`,
  });

  return (
    <div>
      {fields.map((field, valueIndex) => (
        <div key={field.id} className="flex gap-2 mt-2">
          <input
            {...register(`attributes.${attrIndex}.values.${valueIndex}.value`)}
            placeholder="Nhập giá trị"
            className="border p-2 flex-1"
          />
          <button type="button" className="bg-red-500 text-white px-2 py-1" onClick={() => remove(valueIndex)}>
            Delete
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ value: "" })} className="bg-blue-500 text-white px-3 py-1 mt-2">
        Add value
      </button>
    </div>
  );
};

export default DynamicAttributesForm;
