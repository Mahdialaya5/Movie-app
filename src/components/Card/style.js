import styled from "styled-components";

export const MovieCard = styled.div`
  width: 20%;
  height: 530px;
  border-radius: 2%;
  border: 2px solid grey;
 &:hover {
    box-shadow: 4px 5px 5px 4px black;
  }`

export const Button = styled.button({
    width:"20%",
    height: "25px",
    backgroundColor:"blue",
    border:"none",
    color:"white",
    cursor:'pointer'
})

export const P = styled.p({
  height:" 15%",
  overflow: "auto"

})
