module.exports = {
    options: {
        banner: '<%= config.banner %>'
    },
    dist: {
        src: ['<%= config.dir.dist %>/<%= config.dist.fileName %>.js'],
        dest: '<%= config.dir.dist %>/<%= config.dist.fileName %>.js'
    },
    distTpls: {
        src: ['<%= config.dir.dist %>/<%= config.dist.fileNameTpl %>.js'],
        dest: '<%= config.dir.dist %>/<%= config.dist.fileNameTpl %>.js'
    }
};
