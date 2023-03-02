export function addVector(a,b){
    let c = [];
    for (let i = 0; i < a.length; i++){
        c.push(a[i]+b[i]);
    }
    // console.log(a+"  +  "+b+"  =  "+c);
    return c;
}

// module.exports = {addvector};