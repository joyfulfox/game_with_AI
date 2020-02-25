export const validWin = (counter, field, name) => {
    if (counter >= Math.pow(field, 2) / 2) {
        return name;
    }
}