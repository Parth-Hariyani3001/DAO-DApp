import "./investors.css"
function Contribute({state,account}){
  async function contribute(e) {
    try{
      e.preventDefault();
      const {contract} = state;
      const amount = document.querySelector('#weiValue').value;
      await contract.methods.contribution().send({from : account, gas : 480000,value : amount})
    }catch(err) {
      alert(err);
    }
    window.location.reload();
  }
 return<>
 <form onSubmit={contribute}>
   <label className="label1" htmlFor="weiValue">
      <span className="font">Contribution Amount: </span>
    </label>
    <input type="text" id="weiValue" ></input>
    <button type="submit" className="button">Contribute</button>
  </form>
    <br></br>
  </>
}
export default Contribute;