import { useState, useEffect } from "react";

export default function Test() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/product/all", {
          method: "GET",
        });

        const responded = await response.json();

        if (response.ok) {
          console.log("Successful response");
          console.log(responded);
          setProduct(responded.products); // ✅ store in state
        } else {
          console.log("Unsuccessful response", responded);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="width-1170 mg-inline">
      <h1>Test component</h1>
      <div>
        {product.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
