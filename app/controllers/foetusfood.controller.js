import foetusfoodService from '../services/foetusfood.service.js'

export default {
    deploy: (req, res) => {
        foetusfoodService.deploy()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                console.log('save error', err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred"
                });
            })
    },
}
