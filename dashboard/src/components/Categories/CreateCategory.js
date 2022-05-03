import React from "react";

const CreateCategory = () => {
  return (
    <div className="col-md-12 col-lg-4">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control py-3"
            id="product_name"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary py-3">Criar categoria</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
