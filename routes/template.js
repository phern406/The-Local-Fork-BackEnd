//USE THIS FOR ANY AUTHENTICATED ROUTES
router.get('/profile', async(req, res, next) => {
    let myToken = req.headers.authorization;

    if (myToken) {
        let currentUser = await tokenService.verifyToken(myToken);

        if (currentUser) {
            //route logic goes here
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


//router.get('/profile', requireAuth, async(req, res, next) => { -----> this requires just "requireAuth" to be used to secure the route.