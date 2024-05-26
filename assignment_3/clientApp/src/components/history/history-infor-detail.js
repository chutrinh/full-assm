function HistoryInforDetail({ detailOrder }) {
  return (
    <>
      {detailOrder && (
        <>
          <h1>INFORMATION ORDER</h1>
          <p className="my-1">ID user: {detailOrder.user._id}</p>
          <p className="my-1">Phone: {detailOrder.phone}</p>
          <p className="my-1">Address: {detailOrder.address}</p>
          <p className="my-1">
            Total: {Number(detailOrder.total).toLocaleString("vi-VN")} VND
          </p>
          <table className="table mt-3 text-center align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID PRODUCT</th>
                <th scope="col" className="w-25">
                  IMAGE
                </th>
                <th scope="col" className="w-25">
                  NAME
                </th>
                <th scope="col">PRICE</th>
                <th scope="col">COUNT</th>
              </tr>
            </thead>
            <tbody>
              {detailOrder.product.map((detail, i) => {
                return (
                  <tr key={detail._id}>
                    <th scope="row">{i}</th>
                    <td>{detail.productId._id}</td>
                    <td>
                      <img
                        className="w-100"
                        src={"http://localhost:5000/" + detail.productId.img1}
                      />
                    </td>
                    <td>{detail.productId.name}</td>
                    <td>
                      {Number(detail.productId.price).toLocaleString("vi-VN")}
                      VND
                    </td>
                    <td>{detail.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export default HistoryInforDetail;
