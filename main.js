class Product {
  constructor(name, price, qty) {
    this.name = name;
    this.price = price;
    this.qty = qty;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mx-auto text-white bg-secondary mb-4 " style="font-size: 18px; width: 18rem; background-color: #464E2E !important;">
          <div class="card-header">
          <h4 class="card-title" style="font-size: 24px;">Carrito</h4>
          </div>
          <div class="card-body">
            <strong>Producto</strong>: ${product.name}
            <strong>Precio</strong>: $${product.price}
            <strong>Cantidad</strong>: ${product.qty}     
            <a href="#" class="btn btn-danger" name="delete">Eliminar</a>       
          </div>
          
      </div>
    `;
    productList.appendChild(element);
    this.resetForm();
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Producto elminado", "danger");
    }
  }
  showMessage(mensaje, css) {
    const div = document.createElement("div");
    div.className = `alert alert-${css} text-center mx-aut`;
    div.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector(`.container`);
    const store = document.querySelector(`#Store`);
    container.insertBefore(div, store);
    setTimeout(function () {
      document.querySelector(`.alert`).remove();
    }, 2000);
  }
}

document
  .getElementById("product-form")
  .addEventListener("submit", function (events) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const qty = document.getElementById("qty").value;

    const product = new Product(name, price, qty);

    const ui = new UI();

    if (name === "" || price === "" || qty === "") {
      return ui.showMessage("Completa los campos", "danger");
    }

    ui.addProduct(product);
    ui.showMessage("Producto agregado", "success");

    events.preventDefault();
  });

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
