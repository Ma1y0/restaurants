const debugLogger = (req: { method: any; url: any }, res: any, next: () => void) => {
    console.log(`${req.method} url:: ${req.url}`)
    next()
}

export {
    debugLogger
}