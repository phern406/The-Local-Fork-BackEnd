//USE THIS FOR ANY AUTHENTICATED ROUTES
router.get('/profile', async(req, res, next) => {
    let myToken = req.headers.authorization;

    if (myToken) {
        let currentUser = await tokenService.verifyToken(myToken);

        if (currentUser) {
        } else {
            res.json({
                message: "Invalid or expired token",
                status: 403,
            })
        }
    } else {
        res.json({
            message: "No token received",
            status: 403,
        })
    }
})