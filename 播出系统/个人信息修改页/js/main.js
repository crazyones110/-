let changePassword = $(".password>.accountBlockHeader>span:nth-child(2)")
changePassword.on("click",()=>{
    $(".password .accountBlockMain").toggleClass("toggle")
    $(".password .accountBlockHeader").toggleClass("toggle")
})