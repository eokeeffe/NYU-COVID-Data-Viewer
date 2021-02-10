function format(result) {
    let nameParts = [];
    nameParts.push(result.name);
    nameParts.push(result.admin1_name);
    nameParts.push(result.country_name);

    return {
        formatted: nameParts.join(", "),

        city: {
            id: result.id,
            name: result.name
        },
        region: {
            id: result.admin1_id,
            name: result.admin1_name
        },
        country: {
            id: result.country_id,
            name: result.country_name
        },

        coordinates: {
            latitude: result.latitude,
            longitude: result.longitude
        }
    };
}

function find(geocoder, locationId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM everything WHERE id = $id LIMIT 1";
        const vars = {
            $id: locationId
        };

        geocoder.db.all(query, vars, (err, rows) => {
            if (err) {
                return reject(err);
            }

            const result = rows[0] ?
                format(rows[0]) :
                null;
            return resolve(result);
        });
    });
}
