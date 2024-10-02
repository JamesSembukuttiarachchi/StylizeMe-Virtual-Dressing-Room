import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
} from "chart.js";

// Register the required components for the charts
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  BarController
);

export const generateProductsPDF = (products) => {
  const doc = new jsPDF('portrait', 'mm', 'a4');

  // Add a title
  doc.setFontSize(18);
  doc.text("INVENTORY REPORT OF STYLIZEME", 105, 20, { align: "center" });

  // Add metadata
  doc.setFontSize(12);
  doc.setTextColor("#666");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 30);
  doc.setFontSize(12);
  doc.text(`Total Products: ${products.length}`, 15, 40);

  // Define the table data
  const tableData = products.map((product) => [
    product.name,
    product.brand,
    product.category,
    product.clothType,
    `$${product.price.toFixed(2)}`,
    product.quantity,
  ]);

  // Generate the table
  autoTable(doc, {
    startY: 50,
    head: [["Product Name", "Brand", "Category", "Cloth Type", "Price", "Quantity"]],
    body: tableData,
    styles: { fontSize: 10, textColor: "#333", lineColor: "#ccc", lineWidth: 0.1 },
    headStyles: { fillColor: "#074a91", textColor: "#fff" },
    alternateRowStyles: { fillColor: "#f2f2f2" },
    theme: "grid",
    tableWidth: "auto",
    margin: { top: 40, bottom: 10 },
  });

  // Add space below the table
  const tableFinalY = doc.autoTable.previous.finalY + 20;

  // Group products by brand and count the number of products for each brand
  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  const brands = Object.keys(brandCounts);
  const brandData = Object.values(brandCounts);

  // Add a mini title for the bar chart
  doc.setFontSize(14);
  doc.setTextColor("#333");
  doc.text("No. of Products per Brand", 105, tableFinalY, { align: "center" });

  // Generate the bar chart to show the number of products per brand
  const chartCanvas = document.createElement('canvas');
  chartCanvas.width = 400;
  chartCanvas.height = 200;
  const chartContext = chartCanvas.getContext('2d');

  const chart = new Chart(chartContext, {
    type: 'bar',
    data: {
      labels: brands, // Brand names on the X-axis
      datasets: [{
        label: 'Number of Products',
        data: brandData, // Number of products per brand
        backgroundColor: '#042e5c',
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#000', // Black text for bar chart labels
          }
        }
      }
    }
  });

  // Wait for the bar chart to render
  return new Promise((resolve) => {
    setTimeout(() => {
      const chartImage = chartCanvas.toDataURL('image/png');

      // Add the bar chart image to the PDF, positioning it below the title
      const chartY = tableFinalY + 10; // Adjust this value to position below the title
      doc.addImage(chartImage, 'PNG', 15, chartY, 180, 80); // Adjusted size for the bar chart

      // Footer
      doc.setFontSize(10);
      doc.setTextColor("#444");
      doc.text("This report was auto-generated by the system.", 105, doc.internal.pageSize.height - 10, { align: "center" });

      // Save the PDF
      doc.save("inventory-report.pdf");

      // Resolve the promise after saving the PDF
      resolve();
    }, 1000); // Adjust the timeout if needed
  });
};